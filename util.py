from __future__ import annotations

# ---------------------------------------------------------------------------- #
#                                Utils Crawling                                #
# ---------------------------------------------------------------------------- #

def noValueBuild (value: any, tag: str) -> str | int | any:
    if not value: return "[no_{}]".format(tag)
    return value

def getSingleValueInt (value: int |list[int], defaultValue: int = 0) -> int:
    try:
        if not value: return defaultValue
        if (isinstance(value, list) or isinstance(value, str)) and len(value) > 0:
            values = [int(x) for x in value.split() if x.isdigit()]
            return values[0] if len(values) > 0 else defaultValue
        if isinstance(value, list) and len(value) == 0: pass
        return value
    except ValueError:
        return defaultValue
        print('Value must be either int or int[].')