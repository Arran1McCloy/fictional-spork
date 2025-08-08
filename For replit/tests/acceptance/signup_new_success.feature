Feature: Signup then create a new defect

  Scenario: User signs up and creates a defect
    Given I sign up with full_name "Test User", password "pass123", role "General"
    And I am logged in as "Test User" with role "General"
    When I POST /defects with { "title":"Loose hinge", "description":"Door hinge loose", "location":"Warehouse N" }
    Then response status should be 201
    And response should contain "status" with "pending"
