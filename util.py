from __future__ import annotations
import time

# ---------------------------------------------------------------------------- #
#                                     Utils                                    #
# ---------------------------------------------------------------------------- #

def timer_crawl (func: callable) -> callable:
    def wrapper (*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(kwargs['options'].get('CRAWL_NAME', '-'))
        print('Elapsed time: {:.2f} seconds'.format(end - start))
        return result
    return wrapper

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
        print('Value must be either int or int[].')
        return defaultValue