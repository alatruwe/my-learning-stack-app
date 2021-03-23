import React from "react";
import Profile from "./Profile";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe(`Profile component`, () => {
  it("renders the component by default", () => {
    const wrapper = shallow(<Profile />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
