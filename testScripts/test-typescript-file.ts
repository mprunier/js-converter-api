interface Product {
    name: string;
    price: number;
}

//Comment
describe('Suite', () => {
    it('Test', () => {
        const product: Product = {
            name: 'Laptop',
            price: 1000,
        };

        cy.wrap(product).should('have.property', 'name', 'Laptop');
        cy.wrap(product).should('have.property', 'price').and('be.a', 'number');
    });
});