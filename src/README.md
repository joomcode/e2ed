## Dependency graph

This is a graph of the base modules of the project with dependencies between them
(for runtime values only, not for types).

Modules in the dependency graph should only import the modules above them:

0. `../scripts`
1. `types`
2. `constants`
3. `Route`
4. `ApiRoute`
5. `PageRoute`
6. `WebSocketRoute`
7. `configurator`
8. `utils/getHash`
9. `generators`
10. `utils/require`
11. `utils/headers`
12. `utils/screenshot`
13. `utils/viewport`
14. `utils/parse`
15. `utils/distanceBetweenSelectors`
16. `utils/getDurationWithUnits`
17. `utils/valueToString`
18. `utils/error`
19. `utils/asserts`
20. `utils/object`
21. `utils/uiMode`
22. `utils/runLabel`
23. `utils/clone`
24. `utils/userland`
25. `utils/fn`
26. `utils/environment`
27. `utils/packCompiler`
28. `utils/config`
29. `utils/generalLog`
30. `utils/testFilePaths`
31. `utils/exit`
32. `utils/promise`
33. `utils/resourceUsage`
34. `utils/fs`
35. `utils/completedTestRuns`
36. `utils/getGlobalErrorHandler`
37. `utils/tests`
38. `utils/end`
39. `utils/pack`
40. `useContext`
41. `context`
42. `utils/step`
43. `utils/apiStatistics`
44. `utils/selectors`
45. `selectors`
46. `utils/log`
47. `step`
48. `utils/waitForEvents`
49. `utils/expect`
50. `expect`
51. `config`

No module imports `config`, so it is at the very bottom of the graph: it is required only lazily,
inside the body of `getFullPackConfig` from `utils/config` (a deliberate exception to the rule
above), and Playwright reads it by the `CONFIG_PATH` file path (as the `--config` CLI argument),
not by import.
