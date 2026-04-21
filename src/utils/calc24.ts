interface Expr {
  val: number;
  str: string;
}

export function solve24(nums: number[]): string[] {
  if (nums.length !== 4) return [];
  const results: Set<string> = new Set();

  function dfs(arr: Expr[]) {
    if (arr.length === 1) {
      if (Math.abs(arr[0].val - 24) < 1e-6) {
        results.add(arr[0].str);
      }
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i === j) continue;

        const nextArr: Expr[] = [];
        for (let k = 0; k < arr.length; k++) {
          if (k !== i && k !== j) {
            nextArr.push(arr[k]);
          }
        }

        const a = arr[i];
        const b = arr[j];

        // For commutative operations, we can enforce order to reduce duplicates
        if (a.val <= b.val) {
          // addition
          nextArr.push({ val: a.val + b.val, str: `(${a.str} + ${b.str})` });
          dfs(nextArr);
          nextArr.pop();

          // multiplication
          nextArr.push({ val: a.val * b.val, str: `(${a.str} * ${b.str})` });
          dfs(nextArr);
          nextArr.pop();
        } else {
          // addition
          nextArr.push({ val: a.val + b.val, str: `(${b.str} + ${a.str})` });
          dfs(nextArr);
          nextArr.pop();

          // multiplication
          nextArr.push({ val: a.val * b.val, str: `(${b.str} * ${a.str})` });
          dfs(nextArr);
          nextArr.pop();
        }

        // subtraction (a - b)
        nextArr.push({ val: a.val - b.val, str: `(${a.str} - ${b.str})` });
        dfs(nextArr);
        nextArr.pop();

        // division (a / b)
        if (Math.abs(b.val) > 1e-6) {
          nextArr.push({ val: a.val / b.val, str: `(${a.str} / ${b.str})` });
          dfs(nextArr);
          nextArr.pop();
        }
      }
    }
  }

  const initialArr = nums.map(n => ({ val: n, str: String(n) }));
  dfs(initialArr);

  const resArray = Array.from(results).map(s => {
    // Strip outermost parentheses if they wrap the entire expression
    let str = s;
    while (str.startsWith('(') && str.endsWith(')')) {
      let balance = 0;
      let canStrip = true;
      for (let i = 0; i < str.length - 1; i++) {
        if (str[i] === '(') balance++;
        else if (str[i] === ')') balance--;
        if (balance === 0) {
          canStrip = false;
          break;
        }
      }
      if (canStrip) {
        str = str.slice(1, -1);
      } else {
        break;
      }
    }
    return str;
  });

  return Array.from(new Set(resArray));
}
