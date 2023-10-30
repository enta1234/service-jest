const request = require("supertest")
const app = require("../../index")
const userFunc = require("../../src/users/user.func")

jest.mock("../../src/users/user.func")

const mockFindUser = async (users) => {
  userFunc.findUser.mockResolvedValue(users)
}

const mockFindUserById = async (user) => {
  userFunc.findUserById.mockResolvedValue(user)
}

describe("User Controller", () => {
  afterAll((done) => {
    app.close()
    done()
  })

  describe("GET users", () => {
    test("responds with a 404 status code and 'data not found' message when there are no users", async () => {
      await mockFindUser(null)

      const response = await request(app).get("/api/v1/users")

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        isSuccess: false,
        message: "data not found",
        data: [],
      })
    })

    test("returns a 200 status code and a list of users when there are users in the database", async () => {
      const users = [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }]
      await mockFindUser(users)

      const response = await request(app).get("/api/v1/users")

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: users,
        isSuccess: true,
        message: "success",
      });
    });

    test("returns a 500 status code if an internal server error occurs", async () => {
      const error = new Error("internal server error");
      userFunc.findUser.mockRejectedValue(error);

      const response = await request(app).get("/api/v1/users");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        isSuccess: false,
        message: error.message,
        data: [],
      });
    });
  })

  describe("GET user by ID", () => {
    test("responds with a 200 status code and the user data when the user exists", async () => {
      const userId = "user123"
      const user = { id: userId, name: "John Doe" }
      await mockFindUserById(user)

      const response = await request(app).get(`/api/v1/users/${userId}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        data: [user],
        isSuccess: true,
        message: "success",
      })
    })

    test("responds with a 404 status code and 'data not found' message when the user does not exist", async () => {
      const userId = "nonexistentUser"
      await mockFindUserById(null)

      const response = await request(app).get(`/api/v1/users/${userId}`)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        isSuccess: false,
        message: "data not found",
        data: [],
      })
    })

    test("returns a 500 status code if an internal server error occurs", async () => {
      const userId = "user123"
      const error = new Error("internal server error")
      userFunc.findUserById.mockRejectedValue(error)

      const response = await request(app).get(`/api/v1/users/${userId}`)

      expect(response.status).toBe(500)
      expect(response.body).toEqual({
        isSuccess: false,
        message: error.message,
        data: [],
      })
    })
  })
})
