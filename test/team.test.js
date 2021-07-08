const request = require("supertest");
const app = require("../app");

test("팀 생성 테스트", async () => {
    const res = request(app)
        .post("/oauth/logins")
        .set("Accept", "application/json")
        .type("application/json")
        .send({
            userEmail: "t",
            password: "t",
        });

    expect(res.status).toBe(200);
});