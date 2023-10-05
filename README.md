# cf-find

A Command Line Utility for finding a CloudFront Distribution ID

<span class="badge-npmversion"><a href="https://www.npmjs.com/package/cf-find" title="View this project on NPM"><img src="https://img.shields.io/npm/v/cf-find.svg" alt="NPM version" /></a></span>
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![](https://github.com/JordanForeman/cf-find/workflows/Semantic%20Release/badge.svg)
![](https://github.com/JordanForeman/cf-find/workflows/PR%20Verify/badge.svg)
[![Dependabot enabled](https://img.shields.io/badge/🤖%20dependabot-enabled-brightgreen.svg)](https://docs.github.com/en/code-security/dependabot/working-with-dependabot)

## Installation

Installation is as simple as any given node module: 

```bash
$ npm i -g cf-find
```

## Usage

From wherever you want to run `cf-find`, simply open a console and run

```bash
$ cf-find somealias.com
```

...where `somealias.com` is a [CloudFront Alias](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_Aliases.html) you expect to find a match for.

### Options

#### `--silent`

The `--silent` flag will suppress all logs except for the final Distribution ID. Good for CI/CD and other non-user processes.
