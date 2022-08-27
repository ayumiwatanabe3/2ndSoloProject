const chai = require("chai");
const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile);
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const { expect } = chai;

const sample = {
  name: "pasta",
  amount: 1,
  cooking_date: "2022-08-25",
  cooking_by: "daddy",
};

describe("database connection", () => {
  before(async () => {
    await db("foods")
      .insert(sample)
      .then(() => {
        console.log("sampleデータ入れたよ");
      });
  });

  after(async () => {
    await db("foods")
      .where("id", 1)
      .del()
      .then(() => {
        console.log("sampleデータ削除したよ");
      });
  });

  it("should access foods table", async () => {
    const result = await db("foods")
      .select("*")
      .where({ id: 1 })
      .catch((err) => console.err(err));
    expect(result[0].name).to.equal("pasta");
  });
});

// describe("API tests", () => {
//   let request;
//   beforeEach(() => {
// const app = require("./app");

//     request = chai.request(app);
//   });

//   it("should get all the locations data from /api/locations", (done) => {
//     request.get("/api/locations").end((err, res) => {
//       expect(res.statusCode).to.equal(200);
//       expect(res.body.length).to.equal(432);
//       done();
//     });
//   });
// });
