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
10. `utils/E2edError`
11. `utils/asserts`
12. `utils/runLabel`
13. `utils/generalLog`
14. `utils/fn`
15. `utils/fs`
16. `Route`
17. `ApiRoute`
18. `PageRoute`
19. `testController`
20. `useContext`
21. `context/*`
22. `utils/getFullConfig`
23. ...
