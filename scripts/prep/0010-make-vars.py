#!/usr/bin/env python3

import json

seedStrings = [
  "color|color-l|60|90|%|5|10|15|20|30",
  "color|color-c|0|140||10|18|30|60|90",
  "color|color-h|0|360||50|90|170|240|300",
  "font|BLDA|0|500||50|100|150|200|300",
  "font|BLDB|0|1000||90|150|300|450|700",
  "font-s|SKLA|400|700||20|60|120|200|300",
  "font-s|SKLB|0|1000||90|150|300|450|700",
  "font-s|SKLD|0|750||20|60|120|200|300",
  "font-t|TRMA|0|1000||90|150|300|450|700",
  "font-t|TRMB|0|1000||90|150|300|450|700",
  "font-t|TRMC|0|1000||90|150|300|450|700",
  "font-t|TRMD|0|1000||90|150|300|450|700",
  "font-t|TRME|0|1000||90|150|300|450|700",
  "font-t2|TRMF|0|500||90|150|300|450|700",
  "font-t|TRMG|0|1000||90|150|300|450|700",
  "font-t2|TRMK|0|1000||90|150|300|450|700",
  "font-t2|TRML|0|1000||90|150|300|450|700",
  "color-transition|color-transition|0|7000|ms|100|300|1000|3000|4500",
  "font-transition|font-transition|0|7000|ms|100|300|1000|3000|4500",
  "size-transition|size-transition|0|7000|ms|100|300|1000|3000|4500",
  "background-transition|background-transition|0|7000|ms|100|300|1000|3000|4500",
  "font-size|font-size|0.9|3.0|rem|0.2|0.3|0.5|0.6|0.7",
]


class DataMaker:
    def __init__(self):
        self.data = {
            "misc": {
                "background-transition": 18000
                },
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
                "min": parts[2],
                "max": parts[3],
                "unit": parts[4],
                "moves": {
                    "xsmall": parts[5],
                    "small": parts[6],
                    "default": parts[7],
                    "large": parts[8],
                    "xlarge": parts[9],
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

def tmp_slider_check_styles(): 
    print(":root {")
    for seed in seedStrings:
        parts = seed.split("|")
        if parts[0] == "font":
            print(f"--font-{parts[1]}: 100;")
    print("}\n")
    out_vars = []
    for seed in seedStrings:
        parts = seed.split("|")
        if parts[0] == "font":
            out_vars.append(f"""'{parts[1]}' var(--font-{parts[1]})""")
    print(".output {");
    print("font-variation-settings:")
    print(",".join(out_vars))
    print("}\n")


def tmp_slider_check_sliders():
    for seed in seedStrings:
        parts = seed.split("|")
        if parts[0] == "font":
            print(f"""<div>
                  <label>{parts[1]}
<input type="range" data-send="update" data-prop="{parts[1]}"
min="0" max="1000"
                  value="0"
                  >
                  </label>
                  <span data-receive="update" data-prop="{parts[1]}">#</span>
                  </div>""")

def tmp_report():
    for seed in seedStrings:
        parts = seed.split("|")
        if parts[0] == "font" or parts[0] == "font-t":
            print(f"""- {parts[1]} (0-{parts[3]})
""")

if __name__ == "__main__":
    #tmp_slider_check_sliders()

    # tmp_report()


    dm = DataMaker()
    dm.load_seeds()
    dm.add_letters()
    dm.write_file()
    print(dm.output())


          # 'BLDA' var(--BLDA-${letter}),
          # 'BLDB' var(--BLDB-${letter}),
          # 'SKLA' var(--SKLA-${letter}),
          # 'SKLB' var(--SKLB-${letter}),
          # 'SKLD' var(--SKLD-${letter}),
          # 'TRMA' var(--TRMA-${letter}),
          # 'TRMB' var(--TRMB-${letter}),
          # 'TRMC' var(--TRMC-${letter}),
          # 'TRMD' var(--TRMD-${letter}),
          # 'TRME' var(--TRME-${letter}),
          # 'TRMF' var(--TRMF-${letter}),
          # 'TRMG' var(--TRMG-${letter}),
          # 'TRMK' var(--TRMK-${letter}),
          # 'TRML' var(--TRML-${letter});}`);
