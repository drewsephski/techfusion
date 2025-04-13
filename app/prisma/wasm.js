Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  getRuntime} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Get runtime name and throw an error with the provided message
 * @param {string} message - The error message to display
 * @returns {never} - Always throws an error
 */
function createBrowserError(message) {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`${message} (running in ${runtimeName}).\n` +
    'In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report');
}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => createBrowserError('PrismaClientKnownRequestError is unable to run in this browser environment');
Prisma.PrismaClientUnknownRequestError = () => createBrowserError('PrismaClientUnknownRequestError is unable to run in this browser environment');
Prisma.PrismaClientRustPanicError = () => createBrowserError('PrismaClientRustPanicError is unable to run in this browser environment');
Prisma.PrismaClientInitializationError = () => createBrowserError('PrismaClientInitializationError is unable to run in this browser environment');
Prisma.PrismaClientValidationError = () => createBrowserError('PrismaClientValidationError is unable to run in this browser environment');
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => createBrowserError('sqltag is unable to run in this browser environment');
Prisma.empty = () => createBrowserError('empty is unable to run in this browser environment');
Prisma.join = () => createBrowserError('join is unable to run in this browser environment');
Prisma.raw = () => createBrowserError('raw is unable to run in this browser environment');
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = () => createBrowserError('Extensions.getExtensionContext is unable to run in this browser environment');
Prisma.defineExtension = () => createBrowserError('Extensions.defineExtension is unable to run in this browser environment');

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
};

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  plan: 'plan',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  category: 'category',
  features: 'features',
  images: 'images',
  featured: 'featured',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  userId: 'userId',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FeaturedProductScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  priority: 'priority',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  startedAt: 'startedAt',
  endedAt: 'endedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Subscription: 'Subscription',
  Product: 'Product',
  Review: 'Review',
  FeaturedProduct: 'FeaturedProduct'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(_target, _prop) {
        const runtime = getRuntime();
        let message;
        
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:\n` +
            '- Use Prisma Accelerate: https://pris.ly/d/accelerate\n' +
            '- Use Driver Adapters: https://pris.ly/d/driver-adapters\n';
        } else {
          message = `PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in '${runtime.prettyName}').\n`;
        }

        message += 'If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report';

        throw new Error(message);
      }
    });
  }
}

exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
