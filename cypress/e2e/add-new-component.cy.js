describe('Add New Component Workflow', () => {
  beforeEach(() => {
    // Intercept the backend calls for each form submission
    cy.intercept(
      'POST',
      '/get-involved/add-new-component/component-details',
      (req) => {
        req.reply({
          statusCode: 302,
          headers: {
            location: '/get-involved/add-new-component/component-image'
          }
        })
      }
    ).as('submitComponentDetails')

    cy.intercept(
      'POST',
      '/get-involved/add-new-component/component-image',
      (req) => {
        req.reply({
          statusCode: 302,
          headers: { location: '/get-involved/add-new-component/your-details' }
        })
      }
    ).as('submitComponentImage')

    cy.intercept(
      'POST',
      '/get-involved/add-new-component/your-details',
      (req) => {
        req.reply({
          statusCode: 302,
          headers: {
            location: '/get-involved/add-new-component/check-your-answers'
          }
        })
      }
    ).as('submitYourDetails')

    // Intercept the final submission
    cy.intercept(
      'POST',
      'http://localhost:3000/get-involved/add-new-component/check-your-answers',
      (req) => {
        req.reply({
          statusCode: 200,
          body: { success: true, message: 'Form submitted successfully!' }
        })
      }
    ).as('callFormFinalSubmit')
  })

  it('completes the entire workflow with final API call', () => {
    // Step 1: Fill out and submit the initial form
    cy.visit(
      'http://localhost:3000/get-involved/add-new-component/component-details'
    )
    cy.get('input#component-name').type('Accessibility Checker')
    cy.get('textarea[name="briefDescription"]').type(
      'A tool to ensure web components meet accessibility standards.'
    )
    cy.get('textarea[name="whyNeeded"]').type(
      'This component is essential to improve accessibility compliance.'
    )
    cy.get('button[type="submit"]').click()

    // Step 2: Verify redirection to the component-image page
    cy.url().should(
      'include',
      '/get-involved/add-new-component/component-image'
    )

    // Step 3: Upload an image
    const imagePath = 'assets/images/test-image.1.jpeg'
    cy.get('input[type="file"]').attachFile(imagePath)
    cy.get('button[type="submit"]').click()

    // Step 4: Verify redirection to the your-details page
    cy.url().should('include', '/get-involved/add-new-component/your-details')

    // Step 5: Fill out the your-details form
    cy.get('input#full-name').type('John Doe')
    cy.get('input#email-address').type('john.doe@example.com')
    cy.get('input#job-role').type('Frontend Developer')
    cy.get('input#team').type('UX Team')
    cy.get('input#showEmailAddress[value="yes"]').check()
    cy.get('button[type="submit"]').click()

    // Step 6: Verify redirection to the check-your-answers page
    cy.url().should(
      'include',
      '/get-involved/add-new-component/check-your-answers'
    )

    // Step 7: Submit the final form and verify GitHub API call
    cy.get('button[type="submit"]').click()
    cy.wait('@callFormFinalSubmit').its('response.statusCode').should('eq', 200)
  })
})
