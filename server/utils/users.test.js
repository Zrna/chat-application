const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Luka",
        room: "General"
      },
      {
        id: "2",
        name: "Ivan",
        room: "Custom room"
      },
      {
        id: "3",
        name: "Marko",
        room: "General"
      }
    ];
  });

  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Luka",
      room: "The Office"
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    var userId = "1";
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user", () => {
    var userId = "99";
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    var userId = "1";
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it("should not find user", () => {
    var userId = "99";
    var user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  it("should return names for General room", () => {
    var userList = users.getUserList("General");

    expect(userList).toEqual(["Luka", "Marko"]);
  });

  it("should return names for Custom room", () => {
    var userList = users.getUserList("Custom room");

    expect(userList).toEqual(["Ivan"]);
  });
});
