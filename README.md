### Hexlet tests and linter status:
[![Actions Status](https://github.com/alexkwyk/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/alexkwyk/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/alexkwyk/frontend-project-lvl2/actions/workflows/tests&linter.yml/badge.svg)](https://github.com/alexkwyk/frontend-project-lvl2/actions/workflows/tests&linter.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/8cb6299162b5b04663ba/maintainability)](https://codeclimate.com/github/alexkwyk/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8cb6299162b5b04663ba/test_coverage)](https://codeclimate.com/github/alexkwyk/frontend-project-lvl2/test_coverage)
# Difference generator
Compares JSON or YAML files and shows the difference in the three output formats.
## Installation
Make sure you have Node.js(14+) and NPM.
1. Clone this repository: `git@github.com:alexkwyk/frontend-project-lvl2.git`
2. Install: `make install`
## Usage:
```
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number  
  -f, --format <type>  output format (default: "stylish")  
  -h, --help           display help for command  
  ```
## Available formats:
<details>
  <summary>stylish</summary>
  
  ```
  {
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

</details>
<details>
  <summary>plain</summary>
  
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
</details> 
<details>
  <summary>json</summary>

```
{
  "common": {
    "type": "object",
    "children": {
      "follow": {
        "type": "secondFile",
        "file2": false
      },
      "setting1": {
        "type": "equal",
        "value": "Value 1"
      },
      "setting2": {
        "type": "firstFile",
        "file1": 200
      },
      "setting3": {
        "type": "common",
        "file1": true,
        "file2": null
      },
      "setting4": {
        "type": "secondFile",
        "file2": "blah blah"
      },
      "setting5": {
        "type": "secondFile",
        "file2": {
          "key5": "value5"
        }
      },
      "setting6": {
        "type": "object",
        "children": {
          "doge": {
            "type": "object",
            "children": {
              "wow": {
                "type": "common",
                "file1": "",
                "file2": "so much"
              }
            }
          },
          "key": {
            "type": "equal",
            "value": "value"
          },
          "ops": {
            "type": "secondFile",
            "file2": "vops"
          }
        }
      }
    }
  },
  "group1": {
    "type": "object",
    "children": {
      "baz": {
        "type": "common",
        "file1": "bas",
        "file2": "bars"
      },
      "foo": {
        "type": "equal",
        "value": "bar"
      },
      "nest": {
        "type": "common",
        "file1": {
          "key": "value"
        },
        "file2": "str"
      }
    }
  },
  "group2": {
    "type": "firstFile",
    "file1": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  "group3": {
    "type": "secondFile",
    "file2": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
}
```
</details>

## Example

### Stylish:
[![asciicast](https://asciinema.org/a/499729.svg)](https://asciinema.org/a/499729)
### Plain:
[![asciicast](https://asciinema.org/a/499730.svg)](https://asciinema.org/a/499730)
### JSON:
[![asciicast](https://asciinema.org/a/499731.svg)](https://asciinema.org/a/499731)

