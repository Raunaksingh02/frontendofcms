const Questions = [
  {
    id: 1,
    title: "Print Numbers from 1 to N",
    topic: "Loop",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an integer N, print all numbers from 1 to N separated by a single space.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5",
        output: "1 2 3 4 5"
      },
      {
        input: "3",
        output: "1 2 3"
      }
    ],
    hiddenCases: [
      {
        input: "1",
        output: "1"
      },
      {
        input: "8",
        output: "1 2 3 4 5 6 7 8"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 2,
    title: "Sum of First N Natural Numbers",
    topic: "Loop",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an integer N, print the sum of the first N natural numbers.",
    constraints: [
      "1 ≤ N ≤ 10000"
    ],
    visibleCases: [
      {
        input: "5",
        output: "15"
      },
      {
        input: "10",
        output: "55"
      }
    ],
    hiddenCases: [
      {
        input: "20",
        output: "210"
      },
      {
        input: "100",
        output: "5050"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 3,
    title: "Find Maximum Element",
    topic: "Array",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an array of N integers, print the largest element.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n3 7 2 9 1",
        output: "9"
      },
      {
        input: "4\n8 5 2 6",
        output: "8"
      }
    ],
    hiddenCases: [
      {
        input: "3\n1 2 3",
        output: "3"
      },
      {
        input: "5\n10 20 30 40 50",
        output: "50"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 4,
    title: "Reverse an Array",
    topic: "Array",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an array of N integers, print the array in reverse order.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n1 2 3 4 5",
        output: "5 4 3 2 1"
      },
      {
        input: "3\n7 8 9",
        output: "9 8 7"
      }
    ],
    hiddenCases: [
      {
        input: "4\n10 20 30 40",
        output: "40 30 20 10"
      },
      {
        input: "1\n5",
        output: "5"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 5,
    title: "Factorial Using Recursion",
    topic: "Recursion",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an integer N, print the factorial of N using recursion.",
    constraints: [
      "0 ≤ N ≤ 12"
    ],
    visibleCases: [
      {
        input: "5",
        output: "120"
      },
      {
        input: "3",
        output: "6"
      }
    ],
    hiddenCases: [
      {
        input: "0",
        output: "1"
      },
      {
        input: "7",
        output: "5040"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },
    {
    id: 6,
    title: "Count Even Numbers",
    topic: "Array",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an array of N integers, count and print the number of even elements.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n1 2 3 4 6",
        output: "3"
      },
      {
        input: "4\n2 4 6 8",
        output: "4"
      }
    ],
    hiddenCases: [
      {
        input: "3\n1 3 5",
        output: "0"
      },
      {
        input: "6\n10 11 12 13 14 15",
        output: "3"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 7,
    title: "Find Minimum Element",
    topic: "Array",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an array of N integers, print the smallest element.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n9 3 7 2 8",
        output: "2"
      },
      {
        input: "4\n10 5 15 20",
        output: "5"
      }
    ],
    hiddenCases: [
      {
        input: "3\n1 2 3",
        output: "1"
      },
      {
        input: "5\n5 4 3 2 1",
        output: "1"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 8,
    title: "Palindrome Number",
    topic: "Loop",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an integer N, print 'Yes' if it is a palindrome otherwise print 'No'.",
    constraints: [
      "0 ≤ N ≤ 1000000"
    ],
    visibleCases: [
      {
        input: "121",
        output: "Yes"
      },
      {
        input: "123",
        output: "No"
      }
    ],
    hiddenCases: [
      {
        input: "9999",
        output: "Yes"
      },
      {
        input: "12321",
        output: "Yes"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 9,
    title: "Print Array Using Recursion",
    topic: "Recursion",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an array of N integers, print all elements using recursion.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n10 20 30 40 50",
        output: "10 20 30 40 50"
      },
      {
        input: "3\n5 6 7",
        output: "5 6 7"
      }
    ],
    hiddenCases: [
      {
        input: "4\n1 2 3 4",
        output: "1 2 3 4"
      },
      {
        input: "2\n9 8",
        output: "9 8"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 10,
    title: "Reverse a Number",
    topic: "Loop",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an integer N, reverse its digits and print the reversed number.",
    constraints: [
      "0 ≤ N ≤ 1000000"
    ],
    visibleCases: [
      {
        input: "1234",
        output: "4321"
      },
      {
        input: "450",
        output: "54"
      }
    ],
    hiddenCases: [
      {
        input: "100",
        output: "1"
      },
      {
        input: "98765",
        output: "56789"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },
    {
    id: 11,
    title: "Linear Search",
    topic: "Array",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an array of N integers and a target value X, print the index of X if it exists, otherwise print -1.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n10 20 30 40 50\n30",
        output: "2"
      },
      {
        input: "4\n5 8 9 1\n7",
        output: "-1"
      }
    ],
    hiddenCases: [
      {
        input: "3\n1 2 3\n2",
        output: "1"
      },
      {
        input: "5\n4 8 6 9 2\n9",
        output: "3"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 12,
    title: "Count Positive Numbers",
    topic: "Array",
    difficulty: "Easy",
    marks: 10,
    description:
      "Given an array of N integers, count and print the number of positive elements.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n-1 2 3 -4 5",
        output: "3"
      },
      {
        input: "4\n-5 -2 8 10",
        output: "2"
      }
    ],
    hiddenCases: [
      {
        input: "3\n-1 -2 -3",
        output: "0"
      },
      {
        input: "5\n1 2 3 4 5",
        output: "5"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 13,
    title: "Second Largest Element",
    topic: "Array",
    difficulty: "Easy",
    marks: 15,
    description:
      "Given an array of N distinct integers, print the second largest element.",
    constraints: [
      "2 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n10 30 20 50 40",
        output: "40"
      },
      {
        input: "4\n5 9 2 8",
        output: "8"
      }
    ],
    hiddenCases: [
      {
        input: "3\n1 2 3",
        output: "2"
      },
      {
        input: "6\n100 60 80 90 50 70",
        output: "90"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 14,
    title: "Fibonacci Using Recursion",
    topic: "Recursion",
    difficulty: "Easy",
    marks: 15,
    description:
      "Given an integer N, print the Nth Fibonacci number using recursion.",
    constraints: [
      "0 ≤ N ≤ 20"
    ],
    visibleCases: [
      {
        input: "6",
        output: "8"
      },
      {
        input: "8",
        output: "21"
      }
    ],
    hiddenCases: [
      {
        input: "0",
        output: "0"
      },
      {
        input: "10",
        output: "55"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 15,
    title: "Left Rotate Array by One",
    topic: "Array",
    difficulty: "Easy",
    marks: 15,
    description:
      "Given an array of N integers, rotate the array to the left by one position and print the updated array.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n1 2 3 4 5",
        output: "2 3 4 5 1"
      },
      {
        input: "4\n10 20 30 40",
        output: "20 30 40 10"
      }
    ],
    hiddenCases: [
      {
        input: "3\n7 8 9",
        output: "8 9 7"
      },
      {
        input: "1\n5",
        output: "5"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },
    {
    id: 16,
    title: "Binary Search",
    topic: "Array",
    difficulty: "Easy",
    marks: 15,
    description:
      "Given a sorted array of N integers and a target value X, print the index of X using Binary Search. Print -1 if the element is not found.",
    constraints: [
      "1 ≤ N ≤ 100000"
    ],
    visibleCases: [
      {
        input: "5\n1 3 5 7 9\n7",
        output: "3"
      },
      {
        input: "4\n2 4 6 8\n5",
        output: "-1"
      }
    ],
    hiddenCases: [
      {
        input: "6\n10 20 30 40 50 60\n50",
        output: "4"
      },
      {
        input: "3\n1 2 3\n1",
        output: "0"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 17,
    title: "Prime Number",
    topic: "Loop",
    difficulty: "Easy",
    marks: 15,
    description:
      "Given an integer N, determine whether it is a prime number. Print 'Prime' if it is prime otherwise print 'Not Prime'.",
    constraints: [
      "2 ≤ N ≤ 100000"
    ],
    visibleCases: [
      {
        input: "13",
        output: "Prime"
      },
      {
        input: "12",
        output: "Not Prime"
      }
    ],
    hiddenCases: [
      {
        input: "2",
        output: "Prime"
      },
      {
        input: "49",
        output: "Not Prime"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 18,
    title: "Greatest Common Divisor (GCD)",
    topic: "Loop",
    difficulty: "Medium",
    marks: 20,
    description:
      "Given two integers A and B, print their Greatest Common Divisor (GCD).",
    constraints: [
      "1 ≤ A, B ≤ 100000"
    ],
    visibleCases: [
      {
        input: "24 36",
        output: "12"
      },
      {
        input: "18 30",
        output: "6"
      }
    ],
    hiddenCases: [
      {
        input: "100 25",
        output: "25"
      },
      {
        input: "7 11",
        output: "1"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 19,
    title: "Reverse Array Using Recursion",
    topic: "Recursion",
    difficulty: "Medium",
    marks: 20,
    description:
      "Given an array of N integers, reverse the array using recursion and print the resulting array.",
    constraints: [
      "1 ≤ N ≤ 1000"
    ],
    visibleCases: [
      {
        input: "5\n1 2 3 4 5",
        output: "5 4 3 2 1"
      },
      {
        input: "4\n10 20 30 40",
        output: "40 30 20 10"
      }
    ],
    hiddenCases: [
      {
        input: "3\n7 8 9",
        output: "9 8 7"
      },
      {
        input: "1\n5",
        output: "5"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  },

  {
    id: 20,
    title: "Frequency of an Element",
    topic: "Array",
    difficulty: "Medium",
    marks: 20,
    description:
      "Given an array of N integers and an integer X, count and print the number of times X appears in the array.",
    constraints: [
      "1 ≤ N ≤ 100000"
    ],
    visibleCases: [
      {
        input: "5\n1 2 2 3 2\n2",
        output: "3"
      },
      {
        input: "4\n5 6 7 8\n9",
        output: "0"
      }
    ],
    hiddenCases: [
      {
        input: "6\n1 1 1 1 1 1\n1",
        output: "6"
      },
      {
        input: "5\n3 4 5 4 3\n4",
        output: "2"
      }
    ],
    templates: {
      cpp: `#include<iostream>
using namespace std;

int main() {

    // Write your code here

    return 0;
}
`,
      c: `#include<stdio.h>

int main() {

    // Write your code here

    return 0;
}
`,
      java: `import java.util.*;

public class Main {

    public static void main(String[] args) {

        // Write your code here

    }

}
`
    }
  }


];

export default Questions;   