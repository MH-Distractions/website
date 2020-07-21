describe("Sapper template app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has the correct <h1>", () => {
    cy.contains("h1", "Welcome to MH Distractions");
  });

  it("navigates to /activities", () => {
    cy.get("nav a").contains("activities").click();
    cy.url().should("include", "/activities");
  });

  it("navigates to /news", () => {
    cy.get("nav a").contains("news").click();
    cy.url().should("include", "/news");
  });
});
