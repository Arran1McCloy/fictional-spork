Feature: Edit defect mandatory fields

  Scenario: Supervisor updates required fields
    Given I am logged in as "Bob Jones" with role "Supervisor"
    When I PATCH /defects/1 with { "status":"active","urgency":"high","relevant_dept":"Mechanical Fitter" }
    Then response status should be 200

  Scenario: Missing required fields should fail
    Given I am logged in as "Bob Jones" with role "Supervisor"
    When I PATCH /defects/1 with { "notes":"test only" }
    Then response status should be 400
