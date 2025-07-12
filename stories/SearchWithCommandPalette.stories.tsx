import SearchWithCommandPalette from "../src/components/SearchWithCommandPalette";
import { JsonStructure, filterItems, renderJsonStructure } from "../src";
import { Meta, Story } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "SearchWithCommandPalette",
  component: SearchWithCommandPalette,
  parameters: { controls: { expanded: true } },
};

export default meta;

const Template: Story<any> = (args) => {
  const items: JsonStructure = [
    {
      heading: "Navigation",
      id: "navigation",
      items: [
        {
          id: "home",
          children: "Home",
          icon: "HomeIcon",
          href: "#",
          closeOnSelect: true,
        },
        {
          id: "about",
          children: "About",
          icon: "InformationCircleIcon",
          href: "#about",
          closeOnSelect: true,
        },
        {
          id: "contact",
          children: "Contact",
          icon: "EnvelopeIcon",
          href: "#contact",
          closeOnSelect: true,
        },
      ],
    },
    {
      heading: "Actions",
      id: "actions",
      items: [
        {
          id: "new-project",
          children: "New Project",
          icon: "PlusIcon",
          onClick: () => {
            alert("Creating new project...");
          },
          closeOnSelect: true,
        },
        {
          id: "settings",
          children: "Settings",
          icon: "CogIcon",
          onClick: () => {
            alert("Opening settings...");
          },
          closeOnSelect: true,
        },
        {
          id: "logout",
          children: "Logout",
          icon: "ArrowRightOnRectangleIcon",
          onClick: () => {
            alert("Logging out...");
          },
          closeOnSelect: true,
        },
      ],
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Search Button Example</h2>
      <SearchWithCommandPalette {...args}>
        <SearchWithCommandPalette.Page id="root">
          {(search) => {
            const filteredItems = filterItems(items, search);
            return renderJsonStructure(filteredItems);
          }}
        </SearchWithCommandPalette.Page>
      </SearchWithCommandPalette>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search...",
  triggerType: "button",
  popoverPosition: "bottom",
};

export const InputStyle = Template.bind({});
InputStyle.args = {
  placeholder: "Click to search...",
  triggerType: "input",
  popoverPosition: "bottom",
};

export const RightAligned = Template.bind({});
RightAligned.args = {
  placeholder: "Search commands",
  triggerType: "button",
  popoverPosition: "bottom-right",
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  placeholder: "Search",
  triggerType: "button",
  popoverPosition: "bottom",
  buttonClassName: "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700",
  popoverClassName: "shadow-2xl",
};

export const MultipleInstances: Story = () => {
  const items: JsonStructure = [
    {
      heading: "Quick Actions",
      id: "quick",
      items: [
        {
          id: "action1",
          children: "Action 1",
          icon: "BoltIcon",
          onClick: () => alert("Action 1"),
          closeOnSelect: true,
        },
        {
          id: "action2",
          children: "Action 2",
          icon: "SparklesIcon",
          onClick: () => alert("Action 2"),
          closeOnSelect: true,
        },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Search Button 1</h3>
        <SearchWithCommandPalette placeholder="Search actions...">
          <SearchWithCommandPalette.Page id="root">
            {(search) => {
              const filteredItems = filterItems(items, search);
              return renderJsonStructure(filteredItems);
            }}
          </SearchWithCommandPalette.Page>
        </SearchWithCommandPalette>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Search Button 2</h3>
        <SearchWithCommandPalette 
          placeholder="Find something..." 
          triggerType="input"
          popoverPosition="bottom-left"
        >
          <SearchWithCommandPalette.Page id="root">
            {(search) => {
              const filteredItems = filterItems(items, search);
              return renderJsonStructure(filteredItems);
            }}
          </SearchWithCommandPalette.Page>
        </SearchWithCommandPalette>
      </div>
    </div>
  );
};