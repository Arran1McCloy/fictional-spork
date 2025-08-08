Feature: Role-based access

  Scenario: General cannot list defects
    Given I am logged in as "Alice Smith" with role "General"
    When I GET /defects
    Then response status should be 403

  Scenario: Supervisor can edit a defect
    Given I am logged in as "Bob Jones" with role "Supervisor"
    When I PATCH /defects/1 with { "status":"active","urgency":"high","relevant_dept":"Mechanical Fitter" }
    Then response status should be 200
