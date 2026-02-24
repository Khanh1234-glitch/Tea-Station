export declare class ApiService {
    protected baseUrl: string;
    get<T>(endpoint: string): Promise<T>;
    patch<T>(endpoint: string, data: any): Promise<T>;
    getOne<T>(endpoint: string): Promise<T>;
    post<T>(endpoint: string, data: any): Promise<T>;
    put<T>(endpoint: string, data: any): Promise<T>;
    delete(endpoint: string): Promise<void>;
}
//# sourceMappingURL=ApiService.d.ts.map