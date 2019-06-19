describe('Release Notes App', () => {
  // Test constants
  const aboutButton = '#aboutButton';
  const appModal = 'app-modal';
  const cards = '.card';
  const modalCloseButton = '#modalCloseButton';
  const optionID = '#option';
  const option1140 = `${optionID}-1-14-0`;
  const option1150 = `${optionID}-1-15-0`;
  const optionKubectl = `${optionID}-kubectl`;
  const optionKubelet = `${optionID}-kubelet`;
  const optionReleaseEng = `${optionID}-release-eng`;
  const optionsID = '#options';
  const optionsReleaseVersionsID = `${optionsID}-releaseVersions`;
  const searchBar = '#searchBar';
  const v1140entry1 = '#59176';
  const v1140entry2 = '#70309';
  const v1140entry3 = '#71746';
  const v1140entry4 = '#72832';
  const v1140entry5 = '#73250';
  const v1150entry1 = '#60771';
  const v1150entry2 = '#62159';
  const v1150entry3 = '#65782';
  const v1150entry4 = '#66635';
  const v1150entry5 = '#66928';

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the correct title', () => {
    cy.title().should('include', 'Kubernetes Release Notes');
  });

  it(`should everything be visible`, () => {
    cy.get(cards).should('be.visible');
    cy.get(option1140).should('be.visible');
    cy.get(option1150).should('be.visible');
    cy.get(optionsReleaseVersionsID).should('be.visible');
    cy.get(searchBar).should('be.visible');
    cy.location().should(loc => {
      expect(loc.search).to.eq('');
    });
  });

  it(`should show only entries for version '1.14.0' if selected`, () => {
    // Given
    cy.get(option1140).should('not.be.checked');
    cy.get(option1150).should('not.be.checked');
    cy.get(cards).should('have.length', 10);

    // When
    cy.get(option1140).check();

    // Then
    cy.get(option1140).should('be.checked');
    cy.get(option1150).should('not.be.checked');
    cy.get(cards).should($c => {
      expect($c).to.have.length(5);
      expect($c).to.contain(v1140entry1);
      expect($c).to.contain(v1140entry2);
      expect($c).to.contain(v1140entry3);
      expect($c).to.contain(v1140entry4);
      expect($c).to.contain(v1140entry5);
    });
    cy.location().should(loc => {
      expect(loc.search).to.eq('?releaseVersions=1.14.0');
    });
  });

  it(`should show only entries for version '1.15.0' if selected`, () => {
    // Given
    cy.get(option1140).should('not.be.checked');
    cy.get(option1150).should('not.be.checked');
    cy.get(cards).should('have.length', 10);

    // When
    cy.get(option1150).check();

    // Then
    cy.get(option1140).should('not.be.checked');
    cy.get(option1150).should('be.checked');
    cy.get(cards).should($c => {
      expect($c).to.have.length(5);
      expect($c).to.contain(v1150entry1);
      expect($c).to.contain(v1150entry2);
      expect($c).to.contain(v1150entry3);
      expect($c).to.contain(v1150entry4);
      expect($c).to.contain(v1150entry5);
    });
    cy.location().should(loc => {
      expect(loc.search).to.eq('?releaseVersions=1.15.0');
    });
  });

  it(`should show only 'kubelet' entries if selected`, () => {
    // Given
    cy.get(optionKubelet).should('not.be.checked');

    // When
    cy.get(optionKubelet).check();

    // Then
    cy.get(optionKubelet).should('be.checked');
    cy.get(cards).should($c => {
      expect($c).to.have.length(2);
      expect($c).to.contain(v1140entry4);
      expect($c).to.contain(v1150entry5);
    });
    cy.location().should(loc => {
      expect(loc.search).to.eq('?areas=kubelet');
    });
  });

  it(`should be possible to filter two options together`, () => {
    // Given
    cy.get(optionKubectl).should('not.be.checked');
    cy.get(optionReleaseEng).should('not.be.checked');

    // When
    cy.get(optionKubectl).check();
    cy.get(optionReleaseEng).check();

    // Then
    cy.get(optionKubectl).should('be.checked');
    cy.get(optionReleaseEng).should('be.checked');
    cy.get(cards).should($c => {
      expect($c).to.have.length(3);
      expect($c).to.contain(v1140entry3);
      expect($c).to.contain(v1150entry3);
      expect($c).to.contain(v1150entry5);
    });
    cy.location().should(loc => {
      expect(loc.search).to.eq('?areas=kubectl&areas=release-eng');
    });
  });

  it(`should be possible to search entries`, () => {
    // Given
    // When
    cy.get(searchBar).type('proxy');

    // Then
    cy.get(cards).should($c => {
      expect($c).to.have.length(1);
      expect($c).to.contain(v1140entry1);
    });
    cy.location().should(loc => {
      expect(loc.search).to.eq('?markdown=proxy');
    });
  });

  it(`should be possible to open the 'About' page`, () => {
    // Given
    // When
    cy.get(aboutButton).click();

    // Then
    cy.get(appModal).should('be.visible');

    // And When
    cy.get(modalCloseButton).click();

    // Then
    cy.get(appModal).should('not.be.visible');
  });
});
