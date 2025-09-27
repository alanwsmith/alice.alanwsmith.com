#!/usr/bin/env python3

import json

fullPropSet = [
  "color|color-l|60|90|%|5|10|15|20|30",
  "color|color-c|0|140||10|18|30|60|90",
  "color|color-h|0|360||30|56|120|170|210",
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
]

data = { "props": [] }

for prop in fullPropSet:
    parts = prop.split("|")
    data["props"].append({
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
        }
    })

json_string = json.dumps(
    data, 
    sort_keys=True, 
    indent=2, 
    default=str
)

print(f"""const config = {json_string};""")

