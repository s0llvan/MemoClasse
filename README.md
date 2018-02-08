# MémoClasse

[logo]:http://oi64.tinypic.com/eqthrq.jpg "Logo MemoClasse"

[![pipeline status](https://gitlab-ce.iut.u-bordeaux.fr/photoEcole/MemoClasse/badges/master/pipeline.svg)](https://gitlab-ce.iut.u-bordeaux.fr/photoEcole/MemoClasse/commits/master)

MémoClasse is an application which makes life easier for teachers. Children taking pictures of their work and MemoClasse send them to their parents !

## Application

### Distributions

- Google Play Store

### Features
- [ ] Student management
- [ ] Class management
- [ ] Group management
- [ ] Activity management
- [ ] Preview, edit & send PDF reports
- [ ] Create your own avatar
- [ ] Take & edit photo
- [ ] Administration locking

## Development

### Prerequisites

- Ionic
- NodeJS / NPM

### Getting Started

1.Clone the repository

`git clone https://gitlab-ce.iut.u-bordeaux.fr/photoEcole/MemoClasse.git`

2.Install dependencies

`npm install`

3.Launch local web development sever

`ionic serve`

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
