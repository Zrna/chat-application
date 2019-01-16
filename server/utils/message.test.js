var expect = require("expect");

var { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("Should generate correct message object", () => {
    var from = "Jen";
    var text = "Some text.";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});
