package com.example.usermanagement.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Value("${app.cache.user-cache-ttl:3600}")
    private int userCacheTtl;

    @Value("${app.cache.enabled:true}")
    private boolean cacheEnabled;

    @Bean
    @Primary
    @Profile("!prod")
    public CacheManager caffeineCacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager("users", "roles");
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .expireAfterAccess(userCacheTtl, TimeUnit.SECONDS)
                .initialCapacity(100)
                .maximumSize(500));
        return cacheManager;
    }

    @Bean
    @Primary
    @Profile("prod")
    public CacheManager redisCacheManager(RedisConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration cacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(userCacheTtl))
                .disableCachingNullValues()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(
                        new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(cacheConfiguration)
                .withCacheConfiguration("users", cacheConfiguration.entryTtl(Duration.ofSeconds(userCacheTtl)))
                .withCacheConfiguration("roles", cacheConfiguration.entryTtl(Duration.ofSeconds(userCacheTtl * 2)))
                .build();
    }
}
