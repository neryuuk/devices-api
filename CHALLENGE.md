# Devices API challenge

Develop a REST API capable of persisting and managing device resources.

## Device Domain

- [x] Id
- [x] Name
- [x] Brand
- [x] State (available, in-use, inactive)
- [x] Creation time

## Supported Functionalities

- [x] Create a new device.
- [x] Fully and/or partially update an existing device.
- [x] Fetch a single device.
- [x] Fetch all devices.
- [x] Fetch devices by brand.
- [x] Fetch devices by state.
- [x] Delete a single device.

## Domain Validations

- [x] Creation time cannot be updated.
- [x] Name and brand properties cannot be updated if the device is in use.
- [x] In use devices cannot be deleted.

## Acceptance Criteria

- [x] The application should compile and run successfully.
- [x] The application must contain a reasonable test coverage.
- [x] The API must be documented.
- [x] The application must be capable of persisting resources on a database of your choice, excluding in-memory.
- [x] The application must be containerized.
- [x] The project must be delivered as a git repository.
- [x] The project includes a README file with all project related/necessary documentation/instructions.

## Requirements

- [x] TypeScript 5+

## Tips

- Make sure to read all requirements, criteria and evaluation items before starting.
- Try to provide granular changes (e.g. commits) with comments and explanations on what is being changed.
- Provide additional comments of future improvements and possible missing/malfunctioning parts of your implementation.
- If you have questions or any additional information is required, don't hesitate to ask us!

## Evaluation

The solution will be evaluated as per the following criteria:

- Implementation of all acceptance criteria.
- Usage of well-known best practices and design patterns.
- Code efficiency and general performance.
- Additional features and production readiness of the overall solution.
