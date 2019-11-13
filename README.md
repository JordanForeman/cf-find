# cf-find

A Command Line Utility for finding a CloudFront Distribution ID

## Installation

Installation is as simple as any given node module: 

```bash
$ npm i -g cf-find
```

Don't forget the `-g` parameter! This will install the `cf-find` command line interface _globally_. This way you can truly generate new keys on demand!

## Usage

From wherever you want to run `cf-find`, simply open a console and run

```bash
$ cf-find somealias.com
```

...where `somealias.com` is a [CloudFront Alias](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_Aliases.html) you expect to find a match for.

### Options

#### `--silent`

The `--silent` flag will suppress all logs except for the final Distribution ID. Good for CI/CD and other non-user processes.
