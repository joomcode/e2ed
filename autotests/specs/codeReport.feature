Feature: Code report

  Scenario: Scenario without test identifier
    Given base state
    When action
    Then result

  @testId-901
  Scenario: Scenario with test identifier and without test
    Given base state
    When action
    Then result
    And more
    But not that
    * anything

  @testId-902 @testId-903
  Scenario: Scenario with two test identifier tags
    Given base state

  @testId-904
  Scenario: Scenario without steps

  @testId-905
  Scenario: Scenario with empty step
    Given 

  @testId-36
  Scenario: Scenario without steps linked to test
