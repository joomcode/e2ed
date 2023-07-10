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
8. `utils/setReadonlyProperty`
9. `utils/paths`
10. `utils/valueToString`
11. `utils/error`
12. `utils/asserts`
13. `utils/userlandHooks`
14. `utils/fn`
15. `utils/environment`
16. `utils/getFullPackConfig`
17. `utils/runLabel`
18. `utils/generalLog`
19. `utils/runArrayOfFunctionsSafely`
20. `utils/fs`
21. `Route`
22. `ApiRoute`
23. `PageRoute`
24. `testController`
25. `useContext`
26. `context/*`
27. `utils/log`
28. `utils/waitForEvents`
29. ...
