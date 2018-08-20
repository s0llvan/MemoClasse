# MémoClasse

![Image of Logo](https://s33.postimg.cc/65ik0qs5r/eqthrq.jpg)

MémoClasse is an application which makes life easier for teachers. Children taking pictures of their work and MemoClasse send them to their parents !

## Application

### Distributions
- [Google Play Store](https://play.google.com/store/apps/details?id=dawin.app.memoclasse)

### Features
- [x] Student management
- [x] Class management
- [x] Preview, edit & send PDF reports
- [x] Take & edit photo

## Development

### Prerequisites

- Ionic
- NodeJS / NPM

### Getting Started
1.Clone the repository

`git clone https://github.com/s0llvan/MemoClasse`

2.Install dependencies

`cd MemoClasse && npm install`

3.Launch local web development sever

`ionic serve`

or run on your android device

`ionic cordova run android`

### Continuous delivery

#### Commits steps
- Build (compile)
- Test (unit testing)
- Analyze (with SonarQube)

#### APK builds steps
- Build (compile)
- Deploy (to FTP server)

*APK build planned everyday at 7am and 1pm.*

#### Services
SonarQube: [https://sonarcloud.io/dashboard?id=memoclasse](https://sonarcloud.io/dashboard?id=memoclasse)
