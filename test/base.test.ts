import { buildQuery } from "../src";

describe("base", () => {
  it("works", () => {
    const getSmth = buildQuery("GET", () => "smth");
    expect(typeof getSmth).toEqual("function");
  });
});
