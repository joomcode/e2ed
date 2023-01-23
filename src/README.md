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
8. `utils/valueToString`
9. `utils/E2edError`
10. `utils/asserts`
11. `utils/runLabel`
12. `utils/generalLog`
13. `utils/fn`
14. `utils/fs`
15. `Route`
16. `ApiRoute`
17. `PageRoute`
18. `testController`
19. `useContext`
20. `context/*`
21. `utils/getFullConfig`
22. ...
