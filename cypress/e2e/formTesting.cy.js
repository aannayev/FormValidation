describe("Registration Form Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Validates the username field", () => {
    // Leave username empty
    cy.getElement("username-input").clear().blur();
    cy.getElement("error-message-username").should(
      "contain",
      "User Name is required"
    );

    cy.getElementAndType("username-input", "AB").blur();

    cy.getElement("error-message-username").should(
      "contain",
      "User Name must be at least 3 characters"
    );

    // Введите неверное имя пользователя (более 20 символов)
    cy.getElement("username-input")
      .clear()
      .type("VeryLongUserName123456789")
      .blur();
    cy.getElement("error-message-username").should(
      "contain",
      "User Name must be less than 20 characters"
    );

    // Введите неверное имя пользователя (со специальными символами)
    cy.getElement("username-input").clear().type("Invalid@Username").blur();
    cy.getElement("error-message-username").should(
      "contain",
      "User Name can only contain letters and numbers"
    );

    // Введите действительное имя пользователя
    cy.getElement("username-input").clear().type("ValidUser123").blur();
    cy.getElement("error-message-username").should("not.exist");
  });

  it("Validates the email field", () => {
    // Оставьте адрес электронной почты пустым
    cy.getElement("email-input").clear().blur();
    cy.getElement("error-message-email").should("contain", "Email is required");

    // Введите не действительный адрес электронной почты
    cy.getElement("email-input").type("invalidemail").blur();
    cy.getElement("error-message-email").should(
      "contain",
      "Invalid email format"
    );

    // Введите действительный адрес электронной почты
    cy.getElement("email-input").clear().type("validemail@example.com").blur();
    cy.getElement("error-message-email").should("not.exist");
  });

  it("Validates the phone field", () => {
    // Оставьте телефон пустым
    cy.getElement("phone-input").clear().blur();
    cy.getElement("error-message-phone").should("contain", "Phone is required");

    // Введите неверный номер телефона
    cy.getElement("phone-input").type("123").blur();
    cy.getElement("error-message-phone").should(
      "contain",
      "Phone format: XXX-XXX-XXXX"
    );

    // Введите действительный номер телефона
    cy.getElement("phone-input").clear().type("123-456-7890").blur();
    cy.getElement("error-message-phone").should("not.exist");
  });

  it("Validates submit button state", () => {
    cy.getElement("submit-button").should("be.disabled");

    // Заполните все поля действительными данными
    cy.getElement("username-input").type("ValidUser123");
    cy.getElement("email-input").type("validemail@example.com");
    cy.getElement("phone-input").type("123-456-7890");

    cy.getElement("submit-button").should("not.be.disabled");
  });

  it("Submits the form successfully", () => {
    // Заполните все поля действительными данными
    cy.getElement("username-input").type("ValidUser123");
    cy.getElement("email-input").type("validemail@example.com");
    cy.getElement("phone-input").type("123-456-7890");

    // Отправить форму
    cy.getElement("submit-button").click();
    cy.getElement("submit-button").should("contains.text", "Submitting..."); // Assuming there's a loading state
  });

  it("Validates the progress bar functionality", () => {
    cy.getElement("progress-bar")
      .should("have.attr", "style")
      .and("include", "width: 0%;");

    // Введите имя пользователя
    cy.getElement("username-input").type("ValidUser123");
    cy.getElement("progress-bar")
      .should("have.attr", "style")
      .and("include", "width: 33.3333%;");

    // Заполнить электронное письмо
    cy.getElement("email-input").type("validemail@example.com");
    cy.getElement("progress-bar")
      .should("have.attr", "style")
      .and("include", "width: 66.6667%;");

    // Заполнять телефон
    cy.getElement("phone-input").type("123-456-7890");
    cy.getElement("progress-bar")
      .should("have.attr", "style")
      .and("include", "width: 100%;");
  });
  it("Check form redirect to the thank you page", () => {
    cy.getElement("username-input").type("ValidUser123");
    cy.getElement("email-input").type("validemail@example.com");
    cy.getElement("phone-input").type("123-456-7890");
    cy.getElement("submit-button").click();
    cy.contains(/Thank you/i);
  });
});
