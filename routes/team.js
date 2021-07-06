const dbClient = require("../db/db");
const express = require("express");
const router = express.Router();
const _client = dbClient.connect();

/** @typedef Team
 *  @property {string} teamName
 *  @property {id} teamId
 *  @property {User} members
 *  @property {string} creator
 *  @property {Date} created_at
 * */

/** @typedef User
 * @property {string} name
 * @property {string} subject
 * @property {string} provider
 * @property {number} providerId
 * @property {Object | undefined} Team
 * */

async function teamDbCollection() {
    const client = await _client;
    return client.db("HPKC").collection("teams");
}
async function userDbCollection() {
    const client = await _client;
    return client.db("HPKC").collection("users");
}

async function findTeam(teamName, userName) {
    const teamCollection = await teamDbCollection();
    let teamCursor;
    if (!(teamName && userName)) {
        teamCursor = await teamCollection.findOne({
            teamName: teamName,
        });
        return teamCursor;
    }
    teamCursor = await teamCollection.findOne({
        $and: [
            { teamName: teamName },
            {
                creator: userName,
            },
        ],
    });
    return teamCursor;
}
router.post("/create", async (req, res) => {
    if (!req.user) {
        // TODO 권한 오류 페이지만들어서 연결
        res.redirect("/403");
        return;
    }
    const User = req.user;
    const userCursor = await userDbCollection();
    /** @type User*/
    const user = await userCursor.findOne({
        email: User.email,
    });
    if (!(user && user.name === User.name)) {
        res.send("로그인 정보가 정확하지 않습니다.");
        return;
    }
    const teamCollection = await teamDbCollection();
    /** @type Team*/
    const team = {
        teamName: req.body.teamName,
        subject: req.body.subject,
        creator: user._id,
        member_id: [user._id],
    };
    if (!(await findTeam(req.body.teamName))) {
        teamCollection.insertOne({
            ...team,
        });
    } else {
        res.send("exist");
        return;
    }
    userCursor.update({ _id: user._id }, { $set: { team: team.teamName } });
    const memberCursor = teamCollection.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "member_id",
                foreignField: "_id",
                as: "members",
            },
        },
    ]);
    await memberCursor.forEach(console.log);
    res.send(req.body.teamName);
});

router.post("/memberAppend", async (req, res) => {
    const teamCollection = await teamDbCollection();
    const userCollection = await userDbCollection();

    const teamCursor = await findTeam(req.body.teamName, req.user.username);
    const userCursor = await userCollection.findOne({ email: req.body.memberEmail });
    if (teamCursor && userCursor) {
        teamCursor.member_id.push(userCursor._id);
        teamCollection.update(teamCursor, {
            member_id: teamCursor.member_id,
        });
    }

    const memberCursor = teamCollection.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "member_id",
                foreignField: "_id",
                as: "members",
            },
        },
    ]);
    await memberCursor.forEach(console.log);
});

module.exports = router;