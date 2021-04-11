export async function handler(event: any): Promise<any> {
    console.log('Hello Lambda!');
    return {
        statusCode: 200,
        body: { msg: 'Hello', data: 123 }
    }
}

if (require.main === module) {
    const res = handler(null);
    console.log(res);
}
