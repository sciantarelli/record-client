The primary objective of this project is to provide a suite of organizational and productivity tools catering to my own specific needs, using modern tooling to provide desktop-like functionality.

After years of tinkering with various products, I've never found an all-in-one solution for organizing my digital existence that I'm content with. I needed a solution where components such as notes, bookmarks, research, ideas, and more could not only be captured, but additionally tagged (from a single source of tags) and cross-referenced with each other in an effective manner.

This repository contains only the frontend code, with the exception of a lightweight Node server to enable server-side rendering. It is intended to be used in conjunction with my [record-api](https://github.com/sciantarelli/record-api) project.


## Table of Contents

- [Current Architecture](#current-architecture)
- [Future Architecture](#future-architecture)
- [Current Components](#current-components)
- [Future Components](#future-components)


## Current Architecture

- React w/ Redux
- Server-Side Rendering
- Routing
- Asynchronous Operations with redux-saga 
- Progressive Data Loading
- Higher Order Components

## Future Architecture

- Concurrency handling (multiple clients accessing/editing same records)
- More advanced use of local storage and/or offline functionality
- Revisions/Snapshots, allowing the user to track changes
- Code Splitting
- Asset Management
- Day/night themes

## Current Components

- **Notes**: The first version is somewhat rudimentary, but does allow multiple notes to be open and edited. Future versions will allow multiple notes to be viewable simultaneously (horizontal/vertical splitting), similar to how it's handled in an IDE. 

## Future Components

- **Tagging** - A flexible system that may allow for a hierarchy of tags to distinguish high and low level subjects. Will provide a single set of tags to be available for application on every other component (notes, ideas, etc).
- **Ideas** - Will allow ideas to be entered for various things like business ideas, products, apps, etc. Each idea will allow for various ratings on a scale of 1-100, such as level of complexity, cost, development time, marketability, profitability, and more.
- **Bookmarking** - The ability to not only bookmark in traditional fashion, but advanced features to manage a multitude of them, including temporary bookmarks, functions to help keep them organized and up-to-date, a rating system, etc. May optionally be integrated with Notes component.
- **Appointments** - Nothing extravagant planned, but something that allows appointments to be entered with flexible options for notifications (sms, email, frequency of alerts, etc). May be optionally integrated with Notes component.
- **Advanced Querying** - Will serve to search through component records in a variety of fashions, by term(s), tag(s) and probably more.
- **Dashboard** - No detailed plans yet, but will likely serve as a hub for quick access to works in progress, etc

## Demo

A working demo is not yet available to the public, but can be granted upon specific request.