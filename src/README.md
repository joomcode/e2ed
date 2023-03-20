## Dependency graph

This is a graph of the base modules of the project with dependencies between them.

Modules in the dependency graph should only import the modules above them:

0. `../scripts/*`
1. `types/*`
2. `configurator`
3. `constants/*`
4. `testcaferc`
5. `testcafe`
6. `esm/*`
7. `generators/*`
8. `utils/paths`
9. `utils/valueToString`
10. `utils/error`
11. `utils/asserts`
12. `utils/fn`
13. `utils/environment`
14. `utils/getFullPackConfig`
15. `utils/runLabel`
16. `utils/generalLog`
17. `utils/runArrayOfFunctionsSafely`
18. `utils/fs`
19. `Route`
20. `ApiRoute`
21. `PageRoute`
22. `testController`
23. `useContext`
24. `context/*`
25. ...
