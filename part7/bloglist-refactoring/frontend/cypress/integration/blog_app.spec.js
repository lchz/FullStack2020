
describe('Blog app', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test'
    }
    const user2 = {
      name: 'Test User2',
      username: 'test2',
      password: 'test2'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)

    cy.visit('http://localhost:3000')
  })



  it('Login form is shown', function () {
    cy.contains('Log in').click()
    cy.contains('Log in to application')

  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })


    it('fails with wrong credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Testing by Cypress')
      cy.get('#author').type('Testing Author')
      cy.get('#url').type('http://testtest')
      cy.get('#create-button').click()
      cy.contains('Testing by Cypress')
    })
  })

  describe.only('When several blogs created by many people exist', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' })
      cy.createBlog({ author: 'John Doe', title: 'Blog test 1', url: 'http://blogtest' })
      cy.createBlog({author: 'John Doe', title: 'Blog test 2', url: 'http://blogtest'})
      cy.contains('Logout').click()

      cy.login({username: 'test2', password: 'test2'})
      cy.createBlog({author:'Jany Jane', title: 'Blog test 3', url: 'http://blogtest'})

      cy.contains('Blog test 1').parent().as('blog1')
      cy.contains('Blog test 2').parent().as('blog2')
      cy.contains('Blog test 3').parent().as('blog3')
    })

    it('Blogs can be liked', function() {
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('like').click()
      cy.wait(100)

      cy.get('@blog2').contains('likes: 2')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(100)
      cy.get('@like1').click()
      cy.wait(100)
      cy.get('@like1').click()
      cy.wait(100)

      cy.get('@like3').click()
      cy.wait(100)
      cy.get('@like3').click()
      cy.wait(100)
      cy.get('@like3').click()

      cy.wait(100)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes: 3')
        cy.wrap(blogs[1]).contains('likes: 2')
        cy.wrap(blogs[2]).contains('likes: 1')
      })
    })

    it('The creator can delete a blog', function() {
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('remove').click()
      cy.get('home').should('not.contain', 'test3')

      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').should('not.contain', 'remove')
    })
    
  })

})