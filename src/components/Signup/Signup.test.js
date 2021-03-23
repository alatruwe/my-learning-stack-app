import React from "react";
import toJson from "enzyme-to-json";
import Signup from "./Signup";
import { shallow } from "enzyme";

describe(`Signup component`, () => {
  it("renders the component by default", () => {
    const wrapper = shallow(<Signup />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
