
import { AnnouncementBar } from "components/UI/AnnouncementBar";
import React from "react";

export default {
  title: "UI/Announcement Bar",
  component: AnnouncementBar,
  parameters: {
    layout: "fullscreen"
  }
};

const Template = (args) => <AnnouncementBar {...args} />;

export const TestnetData = Template.bind({});
TestnetData.args = {
  isLoggedIn: false
};
