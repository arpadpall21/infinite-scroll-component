# Infinite Scroll React Component

## Description
This infinite scroll React component seamlessly scrolls its members while we are able to provide the next members in the queue, which makes infinite scroll possible. The `InfiniteScroll` component is optimized for two main things
- Performance
  - Only visible members are rendered, plus two members on each side ready to be scrolled into view
- User Experience
  - The user is able to grab members and freely slide them left or right (no flicker, no jump, no pagination buttons, although the code can be easily adjusted for those purposes as well)

The only considerable limitation is that each member must have the same width

## Requirements
 - Node.js v22.9.0+

## Setup
  - Run `npm install`

## Usage
  - The intent here is to provide the `InfiniteScroll` component, but you can start the React server with `npm start` so you can try it out
#### `InifiniteScroll` Component Configurations
- The `parentWidth` and the `membersWidth` props set the width for the parent and for each member that will be scrolled
  - In the example, the parent is 1000px and members are 200px wide, which means 5 members will be visible at a time  
- The `members` prop provides initial members. You need to provide as many members as you want to be visible +3 at the start +2 at the end
  - The extra 5 side elements are necessary so there are always 2 elements ready to be scrolled into view (in case the user fast scrolls)
  - Example provided as `defaultMembers`
- The handleOverflow callback is called each time an element scrolls out of view (on the right). This is where you need to provide new members
  - Example provided

## Background Story