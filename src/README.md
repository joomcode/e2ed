## Dependency graph

This is a graph of the base modules of the project with dependencies between them.

Modules in the dependency graph should only import the modules above them:

0. `../scripts`
1. `types`
2. `configurator`
3. `constants`
4. `testcafe`
5. `esm`
6. `generators`
7. `utils/browser`
8. `utils/getDurationWithUnits`
9. `utils/setReadonlyProperty`
10. `utils/selectors`
11. `utils/paths`
12. `utils/valueToString`
13. `utils/error`
14. `utils/asserts`
15. `utils/clone`
16. `utils/notIncludedInPackTests`
17. `utils/userland`
18. `utils/fn`
19. `utils/environment`
20. `utils/packCompiler`
21. `testcaferc`
22. `utils/config`
23. `utils/runLabel`
24. `utils/generalLog`
25. `utils/resourceUsage`
26. `utils/fs`
27. `utils/tests`
28. `utils/end`
29. `utils/pack`
30. `selectors`
31. `Route`
32. `ApiRoute`
33. `PageRoute`
34. `testController`
35. `useContext`
36. `context`
37. `utils/log`
38. `utils/waitForEvents`
39. `utils/expect`
40. `expect`
41. ...
