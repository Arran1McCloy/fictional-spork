Feature: Dashboard counts

  Scenario: Supervisor sees golden dashboard counts
    Given I am logged in as "Bob Jones" with role "Supervisor"
    When I GET /dashboard/counts
    Then response status should be 200
    And response json should equal { "active": 7, "pending": 3, "high_priority_open": 4 }
