#!/usr/bin/env python3

import json

seedStrings = [
  "color|color-l|60|90|%|5|10|15|20|30",
  "color|color-c|0|140||10|18|30|60|90",
  "color|color-h|0|360||50|90|170|240|300",
  "font|BLDA|0|1000||90|150|300|450|700",
  "font|BLDB|0|1000||90|150|300|450|700",
  "font|SKLA|0|1000||90|150|300|450|700",
  "font|SKLB|0|1000||90|150|300|450|700",
  "font|SKLD|0|1000||90|150|300|450|700",
  "font|TRMA|0|1000||90|150|300|450|700",
  "font|TRMB|0|1000||90|150|300|450|700",
  "font|TRMC|0|1000||90|150|300|450|700",
  "font|TRMD|0|1000||90|150|300|450|700",
  "font|TRME|0|1000||90|150|300|450|700",
  "font|TRMF|0|1000||90|150|300|450|700",
  "font|TRMG|0|1000||90|150|300|450|700",
  "font|TRMK|0|1000||90|150|300|450|700",
  "font|TRML|0|1000||90|150|300|450|700",
  "color-transition|color-transition|0|7000|ms|100|300|1000|3000|4500",
  "font-transition|font-transition|0|7000|ms|100|300|1000|3000|4500",
]


class DataMaker:
    def __init__(self):
        self.data = {
            "letters": {},
            "seeds": {}
        }

    def add_letters(self):
        for letter in [chr(c) for c in range(ord('a'), ord('a') + 26 )]:
            self.data["letters"][letter] = {
                "char": letter,
                "props": {},
            }
            for seed in self.data["seeds"]:
                self.data["letters"][letter]["props"][seed] = {
                        "next_value": None,
                        "previous_value": None,
                    }


    def load_seeds(self):
        for seed in seedStrings:
            parts = seed.split("|")
            self.data["seeds"][parts[1]] = {
                "type": parts[0],
                "prefix": parts[1],
                "min": int(parts[2]),
                "max": int(parts[3]),
                "unit": parts[4],
                "moves": {
                    "xsmall": int(parts[5]),
                    "small": int(parts[6]),
                    "default": int(parts[7]),
                    "large": int(parts[8]),
                    "xlarge": int(parts[9]),
                },
                "next_value": 0,
                "previous_value": 0,
            }

    def output(self):
        return json.dumps(
            self.data, 
            sort_keys=True, 
            indent=2, 
            default=str
        )


    def write_file(self):
        with open("../../content/components/_config.js", "w") as _out:
            _out.write("// The state const is auto generated.\n")
            _out.write(f"""const state = {self.output()};""")






# for seed in seeds:
#     parts = seed.split("|")
#     data["seeds"][parts[1]] = {
#         "type": parts[0],
#         "prefix": parts[1],
#         "min": int(parts[2]),
#         "max": int(parts[3]),
#         "unit": parts[4],
#         "moves": {
#             "xsmall": int(parts[5]),
#             "small": int(parts[6]),
#             "default": int(parts[7]),
#             "large": int(parts[8]),
#             "xlarge": int(parts[9]),
#         }
#     }


# json_string = json.dumps(
#     data, 
#     sort_keys=True, 
#     indent=2, 
#     default=str
# )


# print(json_string)



if __name__ == "__main__":
    dm = DataMaker()
    dm.load_seeds()
    dm.add_letters()
    dm.write_file()
    print(dm.output())

