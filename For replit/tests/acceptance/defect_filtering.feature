Feature: Defect list filtering

  Scenario: List active defects
    Given I am logged in as "Bob Jones" with role "Supervisor"
    When I GET /defects?field=status&op==&vals=active
    Then response status should be 200

  Scenario: Exclude resolved variants
    Given I am logged in as "Bob Jones" with role "Supervisor"
    When I GET /defects?field=status&op=not in&vals=resolved (fixed)&vals=resolved (irreparable)
    Then response status should be 200
