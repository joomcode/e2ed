## Dependency graph

This is a graph of the base modules of the project with dependencies between them.

Modules in the dependency graph should only import the modules above them:

0. `../scripts/*`
1. `types/*`
2. `configurator/*`
3. `constants/*`
4. `testcaferc`
5. `testcafe`
6. `esm/*`
7. `generators/*`
8. `utils/getDurationWithUnits`
9. `utils/setReadonlyProperty`
10. `utils/paths`
11. `utils/valueToString`
12. `utils/error`
13. `utils/asserts`
14. `utils/userlandHooks`
15. `utils/fn`
16. `utils/environment`
17. `utils/getFullPackConfig`
18. `utils/runLabel`
19. `utils/generalLog`
20. `utils/runArrayOfFunctionsSafely`
21. `utils/fs`
22. `Route`
23. `ApiRoute`
24. `PageRoute`
25. `testController`
26. `useContext`
27. `context/*`
28. `utils/log`
29. `utils/waitForEvents`
30. ...
