**Please note this project is only 10-15% complete, this is just the beginning!**

The primary objective of this project is to provide a suite of organizational and productivity tools catering to my own specific needs, using modern tooling to provide desktop-like functionality. Eventually, the aim is to be a full-blown PWA (Progressive Web App).

After years of tinkering with various products, I've never found an all-in-one solution for organizing my digital existence that I'm content with. I needed a solution where components such as notes, bookmarks, research, ideas, and more could not only be captured, but additionally tagged (from a single source of tags) and cross-referenced with each other in an effective manner.

This repository contains only the frontend code, with the exception of a lightweight Node server to enable server-side rendering. It is intended to be used in conjunction with my [record-api](https://github.com/sciantarelli/record-api) project.


## Table of Contents

- [Current Architecture](#current-architecture)
- [Future Architecture](#future-architecture)
- [Current Components](#current-components)
- [Future Components](#future-components)


## Current Architecture

- React w/ Redux
- Server-Side Rendering (SSR)
- React Routing
- Asynchronous Operations Redux Sagas
- Progressive Data Loading
- Higher Order Components
- e2e Testing w/ Testcafe
- Integration Testing w/ Redux Saga Test Plan

## Future Architecture

- Offline functionality
- Encryption
- UI improvements, enhanced and even smarter navigation
- More advanced UI state persistence
- Concurrency handling (multiple clients accessing/editing same records)
- Revisions/Snapshots, allowing the user to track changes
- Code Splitting
- Asset Management
- Day/night themes
- Markdown
- i18n

## Current Components

#### Notes
The first version is somewhat rudimentary, but does allow multiple notes to be open and edited. Future versions will allow multiple notes to be viewable simultaneously (horizontal/vertical splitting), similar to how it's handled in an IDE. 

## Future Components

#### Tagging
A flexible system that may allow for a hierarchy of tags to distinguish high and low level subjects. Will provide a single set of tags to be available for application on every other component (notes, ideas, etc).

#### Collections (Saved Searches)
Search through component records in a variety of fashions, by term(s), tag(s), component type(s), etc. Optionally save the search, generating a collection of records. Collections will be "smart", dynamically updating with record changes.

#### Ideas
Will allow ideas to be entered for various things like business ideas, products, apps, etc. Each idea will allow for various ratings on a scale of 1-100, such as level of complexity, cost, development time, marketability, profitability, and more.

#### Bookmarks
The ability to not only bookmark urls in traditional fashion, but advanced features to manage a multitude of them, including temporary bookmarks, functions to help keep them organized and up-to-date, a rating system, etc. The ability to embed them in other components, such as within a Note, is also on the radar.

#### Journals
The ability to have multiple journals for different purposes, each with the ability to add entries with corresponding timestamps. Example journals could be, "Daily Journal", "Health Journal", "Some Vacation"

#### Alerts
Nothing extravagant planned, but something that allows alerts to be setup with flexible options for notifications (sms, email, frequency of alerts, etc). May be optionally integrated with Notes component.

#### Dashboard
No detailed plans yet, but will likely serve as a hub for quick access to recently viewed records, information about usage, etc.

## Demo

A working demo is not yet available to the public, but can be granted upon specific request.