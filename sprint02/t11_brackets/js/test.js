describe("checkBrackets", function () {
    describe("Correct tests", function () {
      let correct = [
        "(()()", 1,
        "()dad))sad))", 4,
        "1)()))()(())2(()", 4,
        "(((()(())()()())!", 2,
        "((())", 1,
        "((())))))", 3,
        "))((", 4,
        "123", -1,
        "((((((1(((3((((1)))4))))2))))))", 0,
        "(dsfsdf)(dfsjfs)", 0,
        ")1)1)", 3
      ];
      function Correct(str, expected_res) {
        it(`In "${str}" string have to add ${expected_res} brackets`, function () {
          assert.equal(checkBrackets(str), expected_res);
        });
      }
      for (let i = 0; correct[i]; i += 2)
       Correct(correct[i], correct[i + 1])
    });
  
    describe("Incorrect tests", function () {
      let incorrect = [
        undefined,
        null,
        'string',
        1 + 4 + 5,
        ["))156((", 0]
      ];
      function Incorrect(str) {
        it(`If income ${typeof str} return value is -1`, function () {
          assert.equal(checkBrackets(str), -1);
        });
      }
      for (let i = 0; i < incorrect.length; i++)
        Incorrect(incorrect[i]);
    });
  });