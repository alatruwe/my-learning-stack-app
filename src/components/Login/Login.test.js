import React from "react";
import Login from "./Login";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe(`Login component`, () => {
  it("renders the component by default", () => {
    const wrapper = shallow(<Login />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
