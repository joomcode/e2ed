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
12. `utils/environment`
13. `utils/runLabel`
14. `utils/generalLog`
15. `utils/fn`
16. `utils/fs`
17. `Route`
18. `ApiRoute`
19. `PageRoute`
20. `testController`
21. `useContext`
22. `context/*`
23. `utils/getFullPackConfig`
24. ...
