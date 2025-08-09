# Contributing to SmartPlugBD

Thank you for your interest in contributing to SmartPlugBD! We welcome contributions from the community and are pleased to have you join us.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide browser and OS information
- Include screenshots if applicable

### Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Provide mockups or examples if possible

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test thoroughly
6. Submit a pull request

#### Development Setup
```bash
# Clone your fork
git clone https://github.com/yourusername/smartplugbd.git
cd smartplugbd

# Start local development server
python -m http.server 8000
# or
npx http-server -p 8000
```

#### Code Style Guidelines
- Use consistent indentation (2 spaces for HTML/CSS, 4 spaces for JavaScript)
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused
- Use semantic HTML elements
- Follow Bootstrap 5 conventions

#### JavaScript Guidelines
- Use ES6+ features when appropriate
- Prefer `const` and `let` over `var`
- Use meaningful variable names
- Handle errors gracefully
- Add JSDoc comments for functions

#### CSS Guidelines
- Use CSS custom properties (variables) when possible
- Follow BEM methodology for class naming
- Keep specificity low
- Use responsive design principles
- Optimize for performance

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Product search and filtering work
- [ ] Shopping cart functionality
- [ ] User registration and login
- [ ] Admin panel access and features
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Dual currency conversion
- [ ] Payment form validation

### Browser Testing
Test on the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Pull Request Process

1. **Create a descriptive title**
   - Use present tense ("Add feature" not "Added feature")
   - Reference issue numbers if applicable

2. **Provide detailed description**
   - Explain what changes were made
   - Include screenshots for UI changes
   - List any breaking changes

3. **Ensure quality**
   - Code follows style guidelines
   - All tests pass
   - No console errors
   - Responsive design maintained

4. **Update documentation**
   - Update README if needed
   - Add comments to complex code
   - Update version numbers if applicable

## 🏷️ Commit Message Guidelines

Use the following format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(cart): add quantity update functionality
fix(admin): resolve product deletion issue
docs(readme): update installation instructions
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Backend API integration
- [ ] Real payment gateway integration
- [ ] Email notification system
- [ ] Advanced search filters
- [ ] Performance optimization

### Medium Priority
- [ ] Multi-language support
- [ ] Progressive Web App features
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Customer reviews system

### Low Priority
- [ ] Dark mode theme
- [ ] Advanced admin dashboard
- [ ] Social media integration
- [ ] SEO optimization
- [ ] Accessibility improvements

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**
   - Browser and version
   - Operating system
   - Device type (desktop/mobile)

2. **Steps to reproduce**
   - Detailed step-by-step instructions
   - Expected behavior
   - Actual behavior

3. **Additional information**
   - Screenshots or videos
   - Console error messages
   - Network requests (if applicable)

## 💡 Feature Requests

For feature requests, please provide:

1. **Problem description**
   - What problem does this solve?
   - Who would benefit from this feature?

2. **Proposed solution**
   - Detailed description of the feature
   - How should it work?
   - Any alternatives considered?

3. **Additional context**
   - Mockups or wireframes
   - Similar features in other applications
   - Technical considerations

## 📚 Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)

## 📞 Getting Help

- Open an issue for questions
- Join our discussions
- Check existing documentation
- Review closed issues for similar problems

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to SmartPlugBD! 🚀
